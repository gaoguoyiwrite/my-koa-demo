class TastQueue{
  constructor(){
    this.tasks = []
    this.running = false //当前有任务正在执行
  }

  addTask(task){
    if(this.runing){
      this.tasks.push(task)
    }else{
      this.running = true
      let self = this
      task(function next(){
        if(self.tasks.length){
          let task = self.tasks.shift()
          task(next)
        }else{
          self.running = false
        }
      })
    }
  }

}