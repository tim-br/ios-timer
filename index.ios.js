var React = require('react-native');
var {
  Text,
  View,
  AppRegistry,
  StyleSheet
} = React;

var StopWatch = React.createClass({
  render: function(){
    return <View style={styles.container}>
      <View style={[styles.header, this.border('yellow')]}>
        <View style={[styles.timerWrapper, this.border('red')]}>
          <Text>
            00:00.00
          </Text>
        </View>
        <View style={[styles.buttonWrapper, this.border('green')]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>

      <View style={[styles.footer, this.border('blue')]}>
        <Text>
          I am a list of laps
        </Text>
      </View>
    </View>
  },
  startStopButton: function(){
    return <View>
      <Text>
        Start
      </Text>
    </View>
  },
  lapButton: function(){
    return <View>
      <Text>
        Lap
      </Text>
    </View>
  },
  border: function(color){
    return {
      borderColor: color,
      borderWidth: 4
    }
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
    //height: don't user numbers
    // screen size changes
    flex: 3, // takes up 3/8
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('stopwatch', () => StopWatch);
