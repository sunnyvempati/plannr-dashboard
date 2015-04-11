class EventContactsController < ApplicationController
  before_action :authenticate_user

  def create
    event_contact = EventContact.new event_contact_params
    if event_contact.save
      render_success entity: event_contact
    else
      render_error
    end
  end

  def destroy
    event_contact = EventContact.where(event_id: event_contact_params[:event_id],
                                       contact_id: event_contact_params[:contact_id]).first
    render_success event_contact.destroy
  end

  private

  def event_contact_params
    params.require(:event_contact).permit(:event_id, :contact_id)
  end
end
