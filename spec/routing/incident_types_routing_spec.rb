require "spec_helper"

describe IncidentTypesController do
  describe "routing" do

    it "routes to #index" do
      get("/incident_types").should route_to("incident_types#index")
    end

    it "routes to #new" do
      get("/incident_types/new").should route_to("incident_types#new")
    end

    it "routes to #show" do
      get("/incident_types/1").should route_to("incident_types#show", :id => "1")
    end

    it "routes to #edit" do
      get("/incident_types/1/edit").should route_to("incident_types#edit", :id => "1")
    end

    it "routes to #create" do
      post("/incident_types").should route_to("incident_types#create")
    end

    it "routes to #update" do
      put("/incident_types/1").should route_to("incident_types#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/incident_types/1").should route_to("incident_types#destroy", :id => "1")
    end

  end
end
