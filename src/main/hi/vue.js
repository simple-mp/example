export default {
  data() {
    return {
      _rid: -1,
      time: 60
    }
  },
  methods: {
    stop() {

    },
    start() {

    },
    onShow() {

    }
  },
  render() {

  },
  watch: {
    time(newValue , oldValue) {
      self.fireEvent({
        type: 'setData',
        data: {
          time: 60
        }
      })
    }
  },
}