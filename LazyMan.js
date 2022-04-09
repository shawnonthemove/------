class LazyMan {
  constructor(name) {
    this.tasks = [];
    let task = () => {
      console.log(`Hi, this is ${name}`)
      this.next()
    }
    this.tasks.push(task);
    setTimeout(() => {
      this.next()
    }, 0)
  }
  next() {
    let task = this.tasks.shift();
    task && task()
  }
  sleep(time) {
    this.sleepDeal(time, false);
    return this;
  }
  sleepFirst(time) {
    this.sleepDeal(time, true);
    return this;
  }
  sleepDeal(time, flag) {
    if (flag) {
      this.tasks.unshift(() => {
        setTimeout(() => {
          console.log(`Wake up after ${time}`)
          this.next()
        }, time * 1000)})
    }
    else {
      this.tasks.push(() => {
        setTimeout(() => {
          console.log(`Wake up after ${time}`)
          this.next()
        }, time * 1000)})
    }
  }
  eat(food) {
    let task = () => {
      console.log(`Eat ${food}`);
      this.next();
    }
    this.tasks.push(task);
    return this;
  }
}

// 测试过程
const lazyMan = (name) => new LazyMan(name)

// lazyMan('Hank').sleep(5).eat('dinner')

// lazyMan('Hank').eat('dinner').eat('supper')

lazyMan('Hank').eat('supper').sleepFirst(5)