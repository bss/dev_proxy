var read_config_performer = require('./read_config_performer')
  , setup_file_listener_performer = require('./setup_file_listener_performer')


exports.cache_service = require('./cache_service');


exports.middleware = {
  config_reader: function (state) {
    var performer = read_config_performer.create()

    function translate(config) {
      state.config = config;
      return state;
    }

    return performer(state.config_path).then(translate);
  },

  file_watcher: function (state) {
    var performer = setup_file_listener_performer.create()

    function translate(set_listener) {
      state.set_file_change_listener = set_listener;
      return state;
    };

    return performer(state.config.files).then(translate);
  },

  path_matcher: function (state) {
    return state;
  },

  http_server: function (state) {
    return state;
  }
};