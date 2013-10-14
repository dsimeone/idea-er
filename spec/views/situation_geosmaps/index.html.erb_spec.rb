require 'spec_helper'

describe "situation_geosmaps/index" do
  before(:each) do
    assign(:situation_geosmaps, [
      stub_model(SituationGeosmap),
      stub_model(SituationGeosmap)
    ])
  end

  it "renders a list of situation_geosmaps" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
  end
end
