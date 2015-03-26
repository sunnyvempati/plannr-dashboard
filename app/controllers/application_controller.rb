class ApplicationController < ActionController::Base
  respond_to :html, :json
  include ResponseHelpers
  include DateHelpers
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user_session, :current_user

  # sets current user as the tenant
  set_current_tenant_through_filter
  before_filter :set_user_tenant

  def set_user_tenant
    set_current_tenant(current_user)
  end

  private

  def current_user_session
    @current_user_session ||= UserSession.find
  end

  def current_user
    @current_user ||= current_user_session && current_user_session.user
  end

  def authenticate_user
    unless current_user
      store_location
      flash[:notice] = "You must be logged in to access this page"
      redirect_to login_path
      return false
    else
      flash[:notice] = ""
    end
  end

  def store_location
    # session[:return_to] = request.request_uri
  end

  def redirect_back_or_default(default)
    redirect_to(session[:return_to] || default)
    session[:return_to] = nil
  end
end
