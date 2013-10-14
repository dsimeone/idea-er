class CreateIncidents < ActiveRecord::Migration
  def change
    create_table :incidents do |t|
      t.string :title
      t.float :lat
      t.float :lng
      t.text :description
      t.string :incidentType
      t.string :incidentStatus
      t.datetime :finalizedTime

      t.timestamps
    end
  end
end
