class AddAddressToIncidents < ActiveRecord::Migration
  def change
        add_column :incidents, :address, :string
  end
end
