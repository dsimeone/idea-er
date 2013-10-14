require 'spec_helper'

describe "incidents/new" do
  before(:each) do
    assign(:incident, stub_model(Incident,
      :title => "MyString",
      :lat => 1.5,
      :lng => 1.5,
      :description => "MyText",
      :incidentType => "MyString",
      :incidentStatus => "MyString"
    ).as_new_record)
  end

  it "renders new incident form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", incidents_path, "post" do
      assert_select "input#incident_title[name=?]", "incident[title]"
      assert_select "input#incident_lat[name=?]", "incident[lat]"
      assert_select "input#incident_lng[name=?]", "incident[lng]"
      assert_select "textarea#incident_description[name=?]", "incident[description]"
      assert_select "input#incident_incidentType[name=?]", "incident[incidentType]"
      assert_select "input#incident_incidentStatus[name=?]", "incident[incidentStatus]"
    end
  end
end
