class CreateGeosmarkersSituationGeosmaps < ActiveRecord::Migration
  def up
    create_table :geosmarkers_situation_geosmaps, :id => false do |t|
      t.references :geosmarker
      t.references :situation_geosmap
    end

  end

  def down
        drop_table :geosmarkers_situation_geosmaps
  end
end
