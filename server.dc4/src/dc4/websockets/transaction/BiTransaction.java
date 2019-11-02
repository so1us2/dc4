package dc4.websockets.transaction;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.function.BiFunction;

import ox.Threads;

/**
 * 
 * This class essentially wraps around two transactions. Its exeuction blocks until both transactions conclude. Provide
 * a few execution paths.
 * 
 * @author jake
 *
 */
public class BiTransaction<T, S, R> {

  private final Transaction<? extends T> t1;

  private volatile boolean t1Finished = false;

  private final Transaction<? extends S> t2;

  private volatile boolean t2Finished = false;

  R result = null;

  // This is the only case we support right now. Later we want to support waiting for one but not the other.
  private boolean waitAll = true;

  private BiFunction<T, S, R> onComplete;

  public BiTransaction(Transaction<? extends T> t1, Transaction<? extends S> t2) {
    this.t1 = t1;
    this.t2 = t2;
  }

  public BiTransaction<T, S, R> waitAll() {
    waitAll = true;
    return this;
  }

  public BiTransaction<T, S, R> onComplete(BiFunction<T, S, R> onComplete) {
    this.onComplete = onComplete;
    return this;
  }

  /**
   * By default, executes both transactions until success or failure, then applies the onComplete function to the
   * results to generate the result (type R) which can then be extracted with getResult() after execute() returns. Note
   * that onComplete is called immediately after the blocking conditions on the two transactions are met, regardless of
   * whether the calling class calls getResult().
   */
  public BiTransaction<T, S, R> execute() {
    checkNotNull(t1);
    checkNotNull(t2);

    Threads.get(1).execute(() -> {
      t1.execute();
      t1Finished = true;
    });
    Threads.get(1).execute(() -> {
      t2.execute();
      t2Finished = true;
    });

    // This is waitAll == true. Later we want to support other kinds of blocking.
    while (!t1Finished || !t2Finished) {
      Thread.yield();
      continue;
    }

    result = onComplete.apply(t1.getResult(), t2.getResult());

    return this;
  }

  public R getResult() {
    return result;
  }
}
