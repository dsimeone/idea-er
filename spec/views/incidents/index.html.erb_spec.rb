require 'spec_helper'

describe "incidents/index" do
  before(:each) do
    assign(:incidents, [
      stub_model(Incident,
        :title => "Title",
        :lat => 1.5,
        :lng => 1.5,
        :description => "MyText",
        :incidentType => "Incident Type",
        :incidentStatus => "Incident Status"
      ),
      stub_model(Incident,
        :title => "Title",
        :lat => 1.5,
        :lng => 1.5,
        :description => "MyText",
        :incidentType => "Incident Type",
        :incidentStatus => "Incident Status"
      )
    ])
  end

  it "renders a list of incidents" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => 1.5.to_s, :count => 2
    assert_select "tr>td", :text => 1.5.to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
    assert_select "tr>td", :text => "Incident Type".to_s, :count => 2
    assert_select "tr>td", :text => "Incident Status".to_s, :count => 2
  end
end
