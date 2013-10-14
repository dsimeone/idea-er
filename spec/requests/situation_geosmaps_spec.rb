require 'spec_helper'

describe "SituationGeosmaps" do
  describe "GET /situation_geosmaps" do
    it "works! (now write some real specs)" do
      # Run the generator again with the --webrat flag if you want to use webrat methods/matchers
      get situation_geosmaps_path
      response.status.should be(200)
    end
  end
end
