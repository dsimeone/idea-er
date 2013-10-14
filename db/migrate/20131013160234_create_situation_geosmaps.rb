class CreateSituationGeosmaps < ActiveRecord::Migration
  def change
    create_table :situation_geosmaps do |t|
      t.float :centerlat
      t.float :centerlng
      t.string :name
      t.integer :zoom
      t.string :maptype
      t.timestamps
    end
  end
end
