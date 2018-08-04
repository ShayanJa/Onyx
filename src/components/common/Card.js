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
    // shadowColor: '#00022',
    shadowOffset: { width: -2, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
    color: '#111111',
    // backgroundColor: "#037031"
    backgroundColor: '#e6ffff',
    // marginLeft: 5,
    // marginRight: 5,
    // marginTop: 2
  }
};

export { Card };
