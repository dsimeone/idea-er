class CreateGeosmaps < ActiveRecord::Migration
  def change
    create_table :geosmaps do |t|
      t.float :centerlat
      t.float :centerlng
      t.string :name
      t.integer :zoom
      t.string :maptype
      t.integer :incident_id
      t.integer :operation_id
      t.integer :sector_id
      t.integer :user_id
      
      t.timestamps
    end
  end
end
