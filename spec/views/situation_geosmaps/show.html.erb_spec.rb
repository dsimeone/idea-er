require 'spec_helper'

describe "situation_geosmaps/show" do
  before(:each) do
    @situation_geosmap = assign(:situation_geosmap, stub_model(SituationGeosmap))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
  end
end
