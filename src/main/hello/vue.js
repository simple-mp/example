export default {
  data() {
    return {
      time: 60
    }
  },
  methods: {
    stop() {
      clearInterval(this.intervalHandler);
    },
    start() {
      if (this.intervalHandler) {
        this.intervalHandler = null;
        clearInterval(this.intervalHandler);
      }
     let intervalHandler =  this.intervalHandler = setInterval(() => {
        this.time --;
        if (this.time ==0) {
          this.time = 60;
          clearInterval(intervalHandler);
        }
    }, 1000);
    },
    onShow() {
      this.start();
    }
  },
  render() {

  },
  watch: {
    time(newValue , oldValue) {
      
      self.fireEvent({
        type: 'setData',
        rid: this.rid,
        data: {
          time: newValue
        }
      })
    }
  },
}