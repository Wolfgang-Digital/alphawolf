class AwarewolfAPI {
  constructor() {
    this.url = 'http://localhost:3001';
  }

  makeRequest = async ({ endpoint, payload }) => {
    try {
      const res = await fetch(`${this.url}${endpoint}`, payload);
      return await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  login = data => {
    return this.makeRequest({
      endpoint: '/auth/login',
      payload: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    });
  };

  fetchData = ({ endpoint, token }) => {
    return this.makeRequest({
      endpoint: `/api/${endpoint}`,
      payload: {
        method: 'GET',
        headers: { token }
      }
    });
  };
}

const awarewolfAPI = new AwarewolfAPI();
export default awarewolfAPI;