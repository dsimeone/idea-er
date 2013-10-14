require 'spec_helper'

describe "situation_geosmaps/new" do
  before(:each) do
    assign(:situation_geosmap, stub_model(SituationGeosmap).as_new_record)
  end

  it "renders new situation_geosmap form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", situation_geosmaps_path, "post" do
    end
  end
end
