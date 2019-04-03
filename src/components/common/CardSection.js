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
    padding: 5,
    color: "#00dcff",
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#fdd11',
  }
};

export { CardSection };
