class EventContact < ActiveRecord::Base
  belongs_to :contact
  belongs_to :event

  validates :event, uniqueness: { scope: :contact }

  validates :contact, :event, presence: true

  scope :contacts, ->(event_id) {
    includes(:contact)
    .joins('INNER JOIN contacts ON contacts.id = event_contacts.contact_id')
    .where("event_id = '#{event_id}'")
  }

  scope :events, ->(contact_id) {
    includes(:event)
    .where("contact_id = '#{contact_id}'")
  }

  scope :search, ->(event_id, term) {
    wildcard_text = "'%#{term}%'"
    contacts(event_id).where("lower(contacts.name) LIKE lower(#{wildcard_text})")
  }
end
