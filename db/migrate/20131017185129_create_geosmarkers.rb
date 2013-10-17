class CreateGeosmarkers < ActiveRecord::Migration
  def change
    create_table :geosmarkers do |t|
      t.string :name
      t.float :lat
      t.float :lng
      t.string :icon
      t.string :address

      t.timestamps
    end
  end
end
