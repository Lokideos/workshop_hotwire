class ArtistsController < ApplicationController
  def show
    limit = params[:limit].present? ? params[:limit].to_i : 5
    artist = Artist.find(params[:id])
    albums = selected_albums(artist.albums, params[:album_type]).with_attached_cover.preload(:artist)
    tracks = artist.tracks.popularity_ordered.limit(limit)
    next_track_exists = artist.tracks.popularity_ordered.count > limit

    if turbo_frame_request?
      case turbo_frame_request_id
      when /discography/ then render partial: "discography", locals: {artist:, albums:, next_track_exists:}
      when /tracks/ then render partial: "popular_tracks", locals: {artist:, tracks:, limit:, next_track_exists:}
      end
    else
      render action: :show, locals: {artist:, albums:, tracks:, limit:, next_track_exists:}
    end
  end

  private

  def selected_albums(albums, album_type)
    return albums.lp if album_type.blank?

    return albums.lp unless Album.kinds.key?(album_type)

    albums.where(kind: album_type)
  end
end
