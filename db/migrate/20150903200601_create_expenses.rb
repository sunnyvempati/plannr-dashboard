class CreateExpenses < ActiveRecord::Migration
  def change
    create_table :expenses, id: :uuid do |t|
      t.uuid :event_expense_category_id
      t.uuid :vendor_id
      t.string :name
      t.text :notes
      t.decimal :price
      t.integer :quantity

      t.timestamps null: false
    end
  end
end
