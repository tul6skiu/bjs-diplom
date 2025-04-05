const logout = new LogoutButton();
const ratesBoard = new RatesBoard();

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
const updateCurrency =  setInterval(() => getStocks(), 10000);