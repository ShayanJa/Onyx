import React from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    // borderBottomWidth: 1,
    padding: 5,
    // backgroundColor: '#fff',
    color: "#00dcff",
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#fdd11',
    // position: 'relative'
  }
};

export { CardSection };
