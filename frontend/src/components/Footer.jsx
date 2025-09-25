import React from "react";

function Footer({ completedcount, activecount }) {
  return (
    <>
      {completedcount + activecount > 0 && (
        <div className="text-center ">
          <p className="text-sm text-muted-foreground">
            {completedcount > 0 && (
              <>
                🎉 Tuyệt vời! Bạn đã hoàn thành {completedcount} việc
                {activecount > 0 &&
                  `, còn ${activecount} việc nữa thôi. Cố lên!`}
              </>
            )}
            {completedcount === 0 && activecount > 0 && (
              <>Hãy bắt đầu làm {activecount} nhiệm vụ nào!</>
            )}
          </p>
        </div>
      )}
    </>
  );
}

export default Footer;
