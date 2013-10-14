class SituationGeosmapsController < ApplicationController
  # GET /situation_geosmaps
  # GET /situation_geosmaps.json
#  layout 'map' # will use the layout app/views/layouts/map.html.erb

  def index
    @situation_geosmaps = SituationGeosmap.all

      respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @situation_geosmaps }
    end
  end

  # GET /situation_geosmaps/1
  # GET /situation_geosmaps/1.json
  def show
    @situation_geosmap = SituationGeosmap.find(params[:id])

#    respond_to do |format|
#      format.html # show.html.erb
#      format.json { render json: @situation_geosmap}

#    end
#      render 'tracks/index', :layout => 'map'

  end

  def display
    
    @situation_geosmap = SituationGeosmap.find(params[:id])
#    render :nothing => true, :layout => 'map' 
    render 'display', :layout => 'map' 

  end


  # GET /situation_geosmaps/new
  # GET /situation_geosmaps/new.json
  def new
    @situation_geosmap = SituationGeosmap.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @situation_geosmap }
    end
  end

  # GET /situation_geosmaps/1/edit
  def edit
    @situation_geosmap = SituationGeosmap.find(params[:id])
  end

  # POST /situation_geosmaps
  # POST /situation_geosmaps.json
  def create
    @situation_geosmap = SituationGeosmap.new(params[:situation_geosmap])

    respond_to do |format|
      if @situation_geosmap.save
        format.html { redirect_to @situation_geosmap, notice: 'Situation geosmap was successfully created.' }
        format.json { render json: @situation_geosmap, status: :created, location: @situation_geosmap }
      else
        format.html { render action: "new" }
        format.json { render json: @situation_geosmap.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /situation_geosmaps/1
  # PUT /situation_geosmaps/1.json
  def update
    @situation_geosmap = SituationGeosmap.find(params[:id])

    respond_to do |format|
      if @situation_geosmap.update_attributes(params[:situation_geosmap])
        format.html { redirect_to @situation_geosmap, notice: 'Situation geosmap was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @situation_geosmap.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /situation_geosmaps/1
  # DELETE /situation_geosmaps/1.json
  def destroy
    @situation_geosmap = SituationGeosmap.find(params[:id])
    @situation_geosmap.destroy

    respond_to do |format|
      format.html { redirect_to situation_geosmaps_url }
      format.json { head :no_content }
    end
  end
  
  def currentmap
      puts ("current situation_geosmap--------------------------------------------") 
      @situation_geosmap = SituationGeosmap.find(params[:id])
#     layout 'map' # will use the layout app/views/layouts/map.html.erb
#     render :nothing => true
      render :text => SituationGeosmap.find(params[:id]).to_json
  end  
  
  
end
