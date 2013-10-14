require 'spec_helper'

describe "situation_geosmaps/edit" do
  before(:each) do
    @situation_geosmap = assign(:situation_geosmap, stub_model(SituationGeosmap))
  end

  it "renders the edit situation_geosmap form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", situation_geosmap_path(@situation_geosmap), "post" do
    end
  end
end
