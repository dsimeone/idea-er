class CreateIncidentTypes < ActiveRecord::Migration
  def change
    create_table :incident_types do |t|
      t.string :name

      t.timestamps
    end
  end
end
