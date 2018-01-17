import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Form, Alert, Button } from 'antd';
import { authenticate } from '../../redux/Authentication/actions';
import { Logo } from '../../components';
import { Input } from '../../components/ui-components';
import './styles/signin.less';

type Props = {
  isLoggedIn: boolean,
  error: null | Object,
  isFetching: boolean,
  authenticate: authenticate,
  form: {
    validateFields: Function,
    getFieldDecorator: any,
  },
};

class SignInPage extends React.Component<Props> {
  state = {};
  onSignIn = () => {
    const Fields = ['email', 'password'];
    this.props.form.validateFields(Fields, {}, (err, values) => {
      if (!err) {
        this.props.authenticate(values);
      }
    });
  };
  renderAlert = err => <Alert message={err} type="error" banner showIcon={false} />;
  render() {
    const { isLoggedIn, error, isFetching } = this.props;
    const { getFieldDecorator } = this.props.form;
    if (isLoggedIn) return <Redirect to="/dashboard" />;

    return (
      <div className="flex-container signin-container">
        <div className="branding-section">
          <Logo color="#fff" dots="#4990E8" />
          <div className="__content">
            <h3>Welcome</h3>
            <p>
              Ut aute aute deserunt cillum Lorem nostrud ullamco id. Nulla adipisicing anim anim
              velit proident excepteur commodo tempor eiusmod magna eu Lorem. Sint elit et mollit
              labore deserunt sunt adipisicing. Ut officia aliqua commodo id. Ad amet ipsum
              cupidatat reprehenderit pariatur non culpa id. Enim magna do fugiat proident minim
              mollit veniam labore voluptate labore. Do ullamco velit nostrud enim.
            </p>
            <p>
              <Link to="/" className="link-btn link-btn-rounded link-primary">
                Learn More
              </Link>
            </p>
          </div>
          <div className="__footer-actions" />
        </div>
        <div className="form-section">
          <div className="__header">
            <h3 className="title">Sign In</h3>
            <p className="desc">Sign in to your account with your email or IRIS Id.</p>
            <p className="desc">
              New? <Link to="/signup"> Create an account</Link>
            </p>
            <p className="desc">{error ? this.renderAlert(error.message) : null}</p>
          </div>
          <div className="__form-wrapper">
            <Input
              className="input--signin"
              name="email"
              required
              placeholder="Email"
              getFieldDecorator={getFieldDecorator}
            />
            <Input
              className="input--signin"
              name="password"
              type="password"
              required
              placeholder="Password"
              getFieldDecorator={getFieldDecorator}
              onPressEnter={this.onSignIn}
            />
            <Button
              loading={isFetching}
              type="primary"
              className="btn btn--signin"
              size="large"
              onClick={this.onSignIn}
            >
              Sign In
            </Button>
          </div>
          <div className="__footer">
            <Link to="/forgot">Forgot Password</Link>
          </div>
        </div>
      </div>
    );
  }
}
const WrappedForm = Form.create({})(SignInPage);
const mapStateToProps = (state) => {
  const { Auth } = state;
  return {
    isLoggedIn: Auth.isAuthenticated,
    error: Auth.error,
    isFetching: Auth.isFetching,
  };
};
const mapDispatchToProps = dispatch => ({
  authenticate: credentials => dispatch(authenticate(credentials)),
});
export default connect(mapStateToProps, mapDispatchToProps)(WrappedForm);
