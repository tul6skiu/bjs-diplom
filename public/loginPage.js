'use strict'

const userForm = new UserForm();

userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, response => {
      console.log('Ответ сервера при авторизации:', response);
      
      if (response.success) {
        location.reload();
      } else {
        userForm.setLoginErrorMessage(response.error);
      }
    });
  };

  userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, response => {
      console.log('Ответ сервера при регистрации:', response);
      
      if (response.success) {
        location.reload();
      } else {
        userForm.setRegisterErrorMessage(response.error);
      }
    });
  };


