class AwarewolfAPI {
  constructor() {
    this.url = 'http://localhost:3001';
  }

  makeRequest = async ({ endpoint, payload }) => {
    try {
      const res = await fetch(`${this.url}${endpoint}`, payload);
      return await res.json();
    } catch (err) {
      console.log(err.toString());
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

  fetchUsers = token => {
    return this.makeRequest({
      endpoint: '/user',
      payload: {
        method: 'GET',
        headers: { token }
      }
    })
  };
 
  postData = ({ endpoint, data, token }) => {
    return this.makeRequest({
      endpoint: `/api/${endpoint}`,
      payload: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify({ data })
      }
    });
  };

  analyse = ({ endpoint, text, token }) => {
    return this.makeRequest({
      endpoint: `/watson/${endpoint}`,
      payload: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify({ text })
      }
    })
  };
}

const awarewolfAPI = new AwarewolfAPI();
export default awarewolfAPI;