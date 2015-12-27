var React = require('react-native');
var formatTime = require('minutes-seconds-milliseconds');
var {
  Text,
  View,
  AppRegistry,
  StyleSheet,
  TouchableHighlight
} = React;

var StopWatch = React.createClass({
  getInitialState: function(){
    return {
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    }
  },
  render: function(){
    return <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timerWrapper}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={styles.buttonWrapper}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>

      <View style={styles.footer}>
        {this.laps()}
      </View>
    </View>
  },
  laps: function(){
    return this.state.laps.map(function(time, index){
      return <View style={styles.lap}>
        <Text style={styles.lapText}>
          Lap #{index + 1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(time)}
        </Text>
      </View>
    });
  },
  startStopButton: function(){
    var style = this.state.running ? styles.stopButton : styles.startButton;

    return <TouchableHighlight
      underlayColor="gray"
      onPress={this.handleStartPress}
      style={[styles.button, style]}>
      <Text>
        {this.state.running ? 'Stop' : 'Start'}
      </Text>
    </TouchableHighlight>
  },
  lapButton: function(){
    return <TouchableHighlight
      style={styles.button}
      underlayColor="gray"
      onPress={this.handleLapPress}>
      <Text>
        Lap
      </Text>
    </TouchableHighlight>
  },
  handleLapPress: function(){
    var lapTime = this.state.timeElapsed;
    this.setState({
      // don't use push
      laps: this.state.laps.concat([lapTime]),
      startTime: new Date()
    });
  },
  handleStartPress: function(){
    if(this.state.running){
      clearInterval(this.interval);
      this.setState({running: false});
      return
    }

    var startTime = new Date();
    this.setState({startTime: new Date()});

    //Never do this:
    // this.state.timeElapsed = new Date();

    //always use setState to update state with
    // new value
    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date() - this.state.startTime,
        running: true
      });
    }, 30);
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1, // Fill the entire screen
    alignItems: 'stretch'
  },
  header: { //Yellow
    flex: 1
  },
  footer: {  //Blue
    flex: 1
  },
  timerWrapper: { // Red
    //height: xx don't use numbers
    flex: 5, // takes up 5/8th
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    //height: don't user numbers since
    // screen size changes
    flex: 3, // takes up 3/8
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 60
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: '#00CC00'
  },
  stopButton: {
    borderColor: '#B0171F'
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  lapText: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);
