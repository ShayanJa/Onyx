import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import { Actions } from 'react-native-router-flux';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed', loading: false });
    Actions.walletList();
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
    Actions.walletList();
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Image style={styles.imageStyle} source={{uri: "https://cdn.shopify.com/s/files/1/0895/2346/products/blueapatitestone_large.jpg?v=1487991917"}}/>
        </CardSection>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  imageStyle: {
    height: 280,
    width: 20,
    flex: 1,
    width: null,
  },
};

export default LoginForm;
