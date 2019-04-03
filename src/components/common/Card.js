import React from 'react';
import { View } from 'react-native';

const Card = (props) => {
  return (
    <View style={styles.containerStyle}>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderWidth: 1.3,
    borderRadius: 10,
    borderColor: '#00dcff',
    borderBottomWidth: 0.4,
    shadowOffset: { width: -2, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    color: '#111111',
    backgroundColor: '#e6ffff',
  }
};

export { Card };
