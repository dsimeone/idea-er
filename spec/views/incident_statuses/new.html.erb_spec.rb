require 'spec_helper'

describe "incident_statuses/new" do
  before(:each) do
    assign(:incident_status, stub_model(IncidentStatus,
      :name => "MyString"
    ).as_new_record)
  end

  it "renders new incident_status form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", incident_statuses_path, "post" do
      assert_select "input#incident_status_name[name=?]", "incident_status[name]"
    end
  end
end
