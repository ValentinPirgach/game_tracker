class CreateTrackers < ActiveRecord::Migration[5.0]
  def change
    create_table :trackers do |t|
      t.integer :game_id
      t.integer :employee_id

      t.timestamps
    end
  end
end
