require File.expand_path('../boot', __FILE__)

# Pick the frameworks you want:
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module PlannrDashboard
  class Application < Rails::Application
    config.assets.paths << Rails.root.join("vendor","assets","bower_components","flat-ui-sass","vendor","assets","fonts")
    config.assets.paths << Rails.root.join("vendor","assets","bower_components","flat-ui-sass","vendor","assets","images")
    config.assets.paths << Rails.root.join("vendor","assets","bower_components","flat-ui-sass","vendor","assets","javascripts")
    config.assets.paths << Rails.root.join("vendor","assets","bower_components","flat-ui-sass","vendor","assets","stylesheets")
    config.assets.paths << Rails.root.join("vendor","assets","bower_components","flat-ui-sass","vendor","assets")
    config.assets.paths << Rails.root.join("vendor","assets","bower_components","components-font-awesome","fonts")
    config.assets.paths << Rails.root.join("vendor","assets","bower_components","bootstrap-sass-official","assets","stylesheets")
  end
end
