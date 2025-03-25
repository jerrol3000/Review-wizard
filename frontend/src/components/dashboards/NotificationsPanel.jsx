import React from 'react';

export const NotificationsPanel = ({ notifications, onNotificationClick }) => (

  <div className="mt-6">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">
      Recent Notifications
    </h2>
    <div className="bg-white shadow-md p-4 rounded-md">
      {notifications.length > 0 ? (
        notifications.map((note) => (

          <div
            key={note.id}
            className={`p-2 border-l-4 ${
              note.type === "alert"
                ? "border-red-500 text-red-600"
                : "border-yellow-500 text-yellow-600"
            } bg-gray-50 mb-2 rounded-md cursor-pointer`}
            onClick={() => onNotificationClick(note)}
          >

            {note.message}
          </div>
        ))
      ) : (
        <p className="text-gray-500">No notifications at this time.</p>
      )}
    </div>
  </div>
);
