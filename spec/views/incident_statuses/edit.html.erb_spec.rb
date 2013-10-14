require 'spec_helper'

describe "incident_statuses/edit" do
  before(:each) do
    @incident_status = assign(:incident_status, stub_model(IncidentStatus,
      :name => "MyString"
    ))
  end

  it "renders the edit incident_status form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", incident_status_path(@incident_status), "post" do
      assert_select "input#incident_status_name[name=?]", "incident_status[name]"
    end
  end
end
