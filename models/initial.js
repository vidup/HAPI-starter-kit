class Initial {
  getInitialData = async () => {
    // DB Call
    return {
      name: 'Victor',
      surname: 'Dupuy',
      age: 25,
    };
  }
}

export default new Initial();
