class CreateIncidentStatuses < ActiveRecord::Migration
  def change
    create_table :incident_statuses do |t|
      t.string :name

      t.timestamps
    end
  end
end
