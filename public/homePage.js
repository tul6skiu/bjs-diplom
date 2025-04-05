const logout = new LogoutButton()

logout.action = this.action = () => {
    ApiConnector.logout(response => {
      if (response.success) {
        location.reload();
      }
    });
  };