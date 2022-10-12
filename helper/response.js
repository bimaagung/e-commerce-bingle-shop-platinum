module.exports = {
  success: (data) => {
    let res_data = {
      status: 'ok',
      message: 'success',
    };

    if (typeof data !== 'undefined') {
      res_data.data = data;
    }

    return res_data;
  },

  failed: (message, data) => {
    let res_data = {
      status: 'failed',
      message,
    };

    if (typeof data !== 'undefined') {
      res_data.data = data;
    }

    return res_data;
  },
};
