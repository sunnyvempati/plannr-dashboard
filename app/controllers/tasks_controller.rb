class TasksController < ApplicationController
  layout 'main'
  before_action :authenticate_user
  before_action :set_task, only: [:show, :edit, :update, :destroy]

  def index
    @header = "Tasks"
    order = sort_params ? "#{sort_params[:entity]} #{sort_params[:order]}" : 'name asc'
    respond_to do |format|
      format.html
      format.json { render json: Task.includes(:assigned_to).all.order(order), each_serializer: TaskWithEventSerializer }
    end
  end

  def for_user
    render json: Task.includes(:assigned_to).filter(assigned_to: current_user.id, event_id: params[:event_id]), each_serializer: TaskWithEventSerializer
  end

  def show
    @header = "Task"
  end

  def new
    @header = "Create Task"
    @task = Task.new
  end

  def edit
    @header = "Edit Task"
  end

  def create
    @task = Task.new task_params
    render_entity @task
  end

  def update
    @task.assign_attributes task_params
    render_entity @task
  end

  def search_in_events
    search_results = Task.search_in_event(params[:event_id], search_params[:text])
    render_success search_results
  end

  def search
    render_success Task.search(search_params[:text])
  end

  def event_tasks
    binding.pry
    order = sort_params ? "#{sort_params[:entity]} #{sort_params[:order]}" : 'name asc'
    render json: Task.event_tasks(params[:event_id]).order(order)
  end

  def destroy
    @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_url, notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  def mass_destroy
    render_success Task.destroy_all(id: mass_destroy_params[:ids])
  end

  private

  def set_task
    @task = Task.includes(:assigned_to).find(params[:id])
  end

  def task_params
    params.require(:task).permit(:name, :description, :deadline, :event_id, :assigned_to_id, :status).merge(owner: current_user)
  end

  def search_params
    params.require(:search).permit(:text)
  end

  def sort_params
    params.require(:sort).permit(:entity, :order) if params[:sort]
  end

  def mass_destroy_params
    params.require(:destroy_opts).permit(ids: [])
  end
end
