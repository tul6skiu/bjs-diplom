const logout = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget =  new FavoritesWidget();

logout.action = this.action = () => {
    ApiConnector.logout(response => {
      if (response.success) {
        location.reload();
      }
    });
  };


//получение текущего пользователя и отображение информации в виджете профиля
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } else {
        console.error('Ошибка получения данных:', response.error);
    }
});


// запрос получения курсов валют.
function getStocks() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }else {
            console.error('Ошибка получения данных:', response.error);
        }
    });
}
//делаем один вызов
getStocks();

//обновляем каждую минуту
const updateCurrency =  setInterval(() => getStocks(), 60000);

//добавление денег
moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data)
            //не понял как отобразить сообщение вроде делаю вызов но на фронте не видно сообщениея
            moneyManager.setMessage(true, 'Баланс успешно пополнен');
        }else {
            moneyManager.setMessage(false, 'Не удалось попролнить баланс ' + response.error);
        }
    });
}

//конфертация
moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Конвертация прошла успешна:');
        }else {
            moneyManager.setMessage(false, 'В процессе конвертации произошла ошибка ' + response.error);
        }
    })
}

//перевод пользаку
moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, 'Перевод прошел успешно');
        }else {
            moneyManager.setMessage(false, 'В процессе перевода произошла ошибка ' + response.error);
        }
    });
}
//получения списка избранного
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }else {
        console.log('Error:' + response.error);
    }
});

//добавление пользака в избранное
favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Новый пользователь успешно добавлен');
        }else {
            favoritesWidget.setMessage(false, 'При добавлении пользователь произошла ошибка: ' + response.error);
        }
    })
}

//удаление
favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            console.log("успешный результат")
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Пользователь успешно удален');
        }else {
            favoritesWidget.setMessage(false, 'При удаление пользователя произошла ошибка: ' + response.error);
        }
    });
}