class IncidentsController < ApplicationController
  layout 'map' # will use the layout app/views/layouts/map.html.erb

  def create
    puts("create incident--------------------------------------------") 
    puts(params[:incident])
    incident = Incident.new(params[:incident])
          if incident.save
        puts('ssssssuuuuuuuccccceeeeeesssss')
        res={:success=>true,:content=>incident}
      else
        puts("save failed.............")
        res = {:success=>false,:content=>"incident save not possible"}
      end
    render :text=>incident.to_json
  end

  def index
    puts("index incidents--------------------------------------------") 
    @incidents = Incident.all
    respond_to do |format|
        format.html # index.html.erb
        format.json { render json: @incidents }
    end
#    render :text=>(Track.find :all).to_json
  end

  # DELETE /incidents/1
  # DELETE /incidents/1.json
  def destroy
      puts("destroy incident--------------------------------------------") 
    @incident = Incident.find(params[:id])
      if @incident.destroy
       res = {:success=>true,:content=>"incident deleted", :notice => "ppppppppppppp"}
      else
       res = {:success=>false,:content=>"delete operation failed", :notice => "prrrrrrrrrr"}
      end
      render :text=>res.to_json
  end

  def update
    @incident = Incident.find(params[:id])
      puts("update marker--------------------------------------------") 
      @incident.update_attributes(params[:incident])
      if @incident.save 
        res={:success=>true,:content=>@incident}
      else
        res = {:success=>false,:content=>"incident update not possible"}
      end
      render :text=>res.to_json
 end




 
end
